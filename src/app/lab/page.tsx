//@ts-nocheck
import BlurFade from "@/components/magicui/blur-fade";
import dynamic from "next/dynamic";

const ParticleDemo = dynamic(
  () => import("@/components/webgpu/particle-demo").then((m) => m.ParticleDemo),
  { ssr: false }
);

const BLUR_FADE_DELAY = 0.04;

export default function LabPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-8 px-4">
      <section id="hero" className="pt-16 sm:pt-0">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <h1 className="font-medium text-3xl tracking-tighter">WebGPU Lab</h1>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            An interactive playground. Particles are simulated by a compute shader
            and drawn as instanced quads — all on the GPU, in your browser.
          </p>
        </BlurFade>
      </section>

      <section>
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <ParticleDemo />
        </BlurFade>
      </section>
    </main>
  );
}
