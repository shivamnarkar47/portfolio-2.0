"use client";

import { useEffect, useRef, useState } from "react";

// ponytail: single render pipeline, no resize debouncing; upgrade if jank appears
export function GpuHeroBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let destroyed = false;
    let raf = 0;

    (async () => {
      const nav = navigator as any;
      if (!nav.gpu) return;
      const adapter = await nav.gpu.requestAdapter();
      if (!adapter || destroyed) return;
      const device = await adapter.requestDevice();
      if (destroyed) {
        device.destroy();
        return;
      }
      const context = canvas.getContext("webgpu") as any;
      if (!context) return;
      const format = nav.gpu.getPreferredCanvasFormat();
      context.configure({ device, format, alphaMode: "premultiplied" });

      const shader = device.createShaderModule({
        code: `
struct U { time: f32, _p: f32, res: vec2<f32> };
@group(0) @binding(0) var<uniform> u: U;
@vertex
fn vs(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4<f32> {
  var p = array<vec2<f32>,3>(vec2(-1.0,-1.0), vec2(3.0,-1.0), vec2(-1.0,3.0));
  return vec4(p[vi], 0.0, 1.0);
}
@fragment
fn fs(@builtin(position) fc: vec4<f32>) -> @location(0) vec4<f32> {
  let uv = fc.xy / u.res;
  let t = u.time;
  let a = 0.5 + 0.5 * cos(t * 0.4 + uv.x * 3.0);
  let b = 0.5 + 0.5 * sin(t * 0.3 + uv.y * 2.5);
  let col = mix(vec3(0.05,0.08,0.15), vec3(0.15,0.1,0.25), a * b);
  return vec4(col, 0.55);
}
`,
      });

      const pipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: { module: shader, entryPoint: "vs" },
        fragment: { module: shader, entryPoint: "fs", targets: [{ format }] },
        primitive: { topology: "triangle-list" },
      });

      const uniformBuffer = device.createBuffer({
        size: 16,
        usage: 0x0040 | 0x0008,
      });
      const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
      });

      const data = new Float32Array(4);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setOk(true);

      const render = () => {
        if (destroyed) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
        const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        data[0] = performance.now() / 1000;
        data[2] = w;
        data[3] = h;
        device.queue.writeBuffer(uniformBuffer, 0, data);

        const encoder = device.createCommandEncoder();
        const view = context.getCurrentTexture().createView();
        const pass = encoder.beginRenderPass({
          colorAttachments: [
            {
              view,
              clearValue: { r: 0, g: 0, b: 0, a: 0 },
              loadOp: "clear",
              storeOp: "store",
            },
          ],
        });
        pass.setPipeline(pipeline);
        pass.setBindGroup(0, bindGroup);
        pass.draw(3);
        pass.end();
        device.queue.submit([encoder.finish()]);
        if (reduced) return;
        raf = requestAnimationFrame(render);
      };
      if (reduced) render(); else raf = requestAnimationFrame(render);
    })().catch(() => {});

    return () => {
      destroyed = true;
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {!ok && (
        <div
          className={className}
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(99,102,241,0.18), transparent 70%)",
          }}
          aria-hidden
        />
      )}
      <canvas
        ref={canvasRef}
        className={className}
        style={{ display: ok ? "block" : "none", width: "100%", height: "100%" }}
        aria-hidden
      />
    </>
  );
}
