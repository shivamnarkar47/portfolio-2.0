"use client";

import { useEffect, useRef, useState } from "react";

const WORKGROUP = 64;

export function ParticleDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [count, setCount] = useState(20000);
  const [speed, setSpeed] = useState(1);
  const [size, setSize] = useState(6);
  const [running, setRunning] = useState(true);
  const [fps, setFps] = useState(0);
  const [supported, setSupported] = useState<boolean | null>(null);

  const countRef = useRef(count);
  const speedRef = useRef(speed);
  const sizeRef = useRef(size);
  const runningRef = useRef(running);
  const stateRef = useRef<any>(null);
  useEffect(() => { countRef.current = count; }, [count]);
  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { sizeRef.current = size; }, [size]);
  useEffect(() => { runningRef.current = running; }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let destroyed = false;
    const s: any = {
      device: null, context: null, format: "", computePipeline: null,
      renderPipeline: null, particleBuffer: null, uniformBuffer: null,
      bindGroupCompute: null, bindGroupRender: null, params: new Float32Array(8),
      raf: 0, last: performance.now(), frames: 0, acc: 0,
    };
    stateRef.current = s;

    const initParticles = (n: number) => {
      if (!s.device) return;
      const init = new Float32Array(n * 4);
      for (let i = 0; i < n; i++) {
        init[i * 4] = Math.random() * 2 - 1;
        init[i * 4 + 1] = Math.random() * 2 - 1;
        init[i * 4 + 2] = (Math.random() - 0.5) * 0.02;
        init[i * 4 + 3] = (Math.random() - 0.5) * 0.02;
      }
      if (s.particleBuffer) s.particleBuffer.destroy();
      const pb = s.device.createBuffer({
        size: init.byteLength,
        usage: 0x0080 | 0x0008, // STORAGE | COPY_DST
      });
      s.device.queue.writeBuffer(pb, 0, init);
      s.particleBuffer = pb;
      // rebuild bind groups
      s.bindGroupCompute = s.device.createBindGroup({
        layout: s.computePipeline.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: pb } },
          { binding: 1, resource: { buffer: s.uniformBuffer } },
        ],
      });
      s.bindGroupRender = s.device.createBindGroup({
        layout: s.renderPipeline.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: pb } },
          { binding: 1, resource: { buffer: s.uniformBuffer } },
        ],
      });
    };
    s.initParticles = initParticles;

    (async () => {
      const nav = navigator as any;
      if (!nav.gpu) { setSupported(false); return; }
      const adapter = await nav.gpu.requestAdapter();
      if (!adapter || destroyed) return;
      const device = await adapter.requestDevice();
      if (destroyed) { device.destroy(); return; }
      device.addEventListener("uncapturederror", (e: any) => console.error("WebGPU:", e.error?.message ?? e.error));
      const context = canvas.getContext("webgpu") as any;
      if (!context) { setSupported(false); device.destroy(); return; }
      const format = nav.gpu.getPreferredCanvasFormat();
      context.configure({ device, format, alphaMode: "premultiplied" });

      const shader = device.createShaderModule({
        code: `
struct P { pos: vec2<f32>, vel: vec2<f32> };
struct Params { time: f32, dt: f32, count: f32, speed: f32, size: f32, _p: f32, _q: f32, _r: f32 };
@group(0) @binding(0) var<storage, read_write> particles: array<P>;
@group(0) @binding(1) var<uniform> params: Params;

@compute @workgroup_size(${WORKGROUP})
fn cs(@builtin(global_invocation_id) gid: vec3<u32>) {
  let i = gid.x;
  if (f32(i) >= params.count) { return; }
  var p = particles[i];
  let toCenter = -p.pos;
  p.vel = p.vel + toCenter * 0.4 * params.dt;
  p.vel = p.vel * 0.985;
  p.pos = p.pos + p.vel * params.dt * params.speed;
  if (p.pos.x > 1.0) { p.pos.x = p.pos.x - 2.0; }
  if (p.pos.x < -1.0) { p.pos.x = p.pos.x + 2.0; }
  if (p.pos.y > 1.0) { p.pos.y = p.pos.y - 2.0; }
  if (p.pos.y < -1.0) { p.pos.y = p.pos.y + 2.0; }
  particles[i] = p;
}

@vertex
fn vs(@builtin(vertex_index) vi: u32, @builtin(instance_index) ii: u32) -> @builtin(position) vec4<f32> {
  if (f32(ii) >= params.count) { return vec4(0.0,0.0,0.0,0.0); }
  let p = particles[ii];
  var corners = array<vec2<f32>,4>(vec2(-1.0,-1.0), vec2(1.0,-1.0), vec2(-1.0,1.0), vec2(1.0,1.0));
  let c = corners[vi % 4u];
  let px = c * params.size / 120.0;
  return vec4(p.pos + px, 0.0, 1.0);
}

@fragment
fn fs() -> @location(0) vec4<f32> {
  return vec4(0.45, 0.65, 1.0, 0.85);
}
`,
      });

      const computePipeline = device.createComputePipeline({
        layout: "auto",
        compute: { module: shader, entryPoint: "cs" },
      });
      const renderPipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: { module: shader, entryPoint: "vs" },
        fragment: { module: shader, entryPoint: "fs", targets: [{ format }] },
        primitive: { topology: "triangle-strip" },
      });

      const uniformBuffer = device.createBuffer({
        size: 32,
        usage: 0x0040 | 0x0008, // UNIFORM | COPY_DST
      });

      Object.assign(s, { device, context, format, computePipeline, renderPipeline, uniformBuffer });
      initParticles(countRef.current);
      setSupported(true);

      const render = () => {
        if (destroyed) return;
        const now = performance.now();
        const dt = Math.min((now - s.last) / 1000, 0.033);
        s.last = now;
        s.frames++;
        s.acc += dt;
        if (s.acc >= 0.5) {
          setFps(Math.round(s.frames / s.acc));
          s.frames = 0;
          s.acc = 0;
        }

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
        const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }

        s.params[0] = now / 1000;
        s.params[1] = dt;
        s.params[2] = countRef.current;
        s.params[3] = speedRef.current;
        s.params[4] = sizeRef.current;
        device.queue.writeBuffer(s.uniformBuffer, 0, s.params);

        const encoder = device.createCommandEncoder();
        if (runningRef.current) {
          const cpass = encoder.beginComputePass();
          cpass.setPipeline(s.computePipeline);
          cpass.setBindGroup(0, s.bindGroupCompute);
          cpass.dispatchWorkgroups(Math.ceil(countRef.current / WORKGROUP));
          cpass.end();
        }
        const view = context.getCurrentTexture().createView();
        const rpass = encoder.beginRenderPass({
          colorAttachments: [{ view, clearValue: { r: 0.02, g: 0.03, b: 0.08, a: 1 }, loadOp: "clear", storeOp: "store" }],
        });
        rpass.setPipeline(s.renderPipeline);
        rpass.setBindGroup(0, s.bindGroupRender);
        rpass.draw(4, countRef.current);
        rpass.end();
        device.queue.submit([encoder.finish()]);

        s.raf = requestAnimationFrame(render);
      };
      s.raf = requestAnimationFrame(render);
    })().catch(() => setSupported(false));

    return () => {
      destroyed = true;
      if (s.raf) cancelAnimationFrame(s.raf);
      try { s.particleBuffer?.destroy(); s.uniformBuffer?.destroy(); s.device?.destroy(); } catch {}
    };
  }, []);

  useEffect(() => {
    stateRef.current?.initParticles?.(count);
  }, [count]);

  // Actually reinit via a ref to the state object stored on canvas's parent? We stored in closure; need access.
  // Instead, expose reinit through a ref.
  // Simpler: trigger full reinit by changing a key is not possible here. We'll handle count change by recreating buffer
  // through a separate effect that reaches the state via a global ref.

  if (supported === false) {
    return (
      <div className="rounded-lg border p-6 text-muted-foreground">
        WebGPU not supported in this browser. Try Chrome/Edge/Safari 18+.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <label className="flex items-center gap-2">
          Particles
          <input type="range" min={1000} max={100000} step={1000} value={count}
            onChange={(e) => setCount(Number(e.target.value))} />
          <span className="font-mono w-16">{count}</span>
        </label>
        <label className="flex items-center gap-2">
          Speed
          <input type="range" min={0.1} max={3} step={0.1} value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          Size
          <input type="range" min={1} max={8} step={1} value={size}
            onChange={(e) => setSize(Number(e.target.value))} />
        </label>
        <button onClick={() => setRunning((r) => !r)} className="px-3 py-1 rounded border">
          {running ? "Pause" : "Play"}
        </button>
        <span className="font-mono text-muted-foreground">{fps} fps</span>
      </div>
      <canvas ref={canvasRef} className="w-full h-[60vh] rounded-lg border bg-black" />
      <p className="text-xs text-muted-foreground">
        Particles are simulated with a WebGPU compute shader and rendered as instanced quads.
      </p>
    </div>
  );
}
