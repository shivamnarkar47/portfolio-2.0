// ponytail: minimal WebGPU helpers
export function hasWebGPU(): boolean {
  return typeof navigator !== "undefined" && "gpu" in navigator;
}

export async function isWebGPUSupported(): Promise<boolean> {
  if (!hasWebGPU()) return false;
  try {
    const adapter = await (navigator as any).gpu.requestAdapter();
    if (!adapter) return false;
    const device = await adapter.requestDevice();
    device.destroy();
    return true;
  } catch {
    return false;
  }
}

export async function getGPUInfo(): Promise<string | null> {
  if (!hasWebGPU()) return null;
  try {
    const adapter = await (navigator as any).gpu.requestAdapter();
    if (!adapter) return null;
    return adapter.info?.device ?? adapter.info?.vendor ?? "WebGPU";
  } catch {
    return null;
  }
}
