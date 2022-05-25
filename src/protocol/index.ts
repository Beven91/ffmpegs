import FFMpegProtocol from "./base";
import FileProtocol from "./file";
import HttpProtocol from "./http";

export default function loadAvcodecInput(url: string | File, minRead: number): FFMpegProtocol {
  const min = Math.max(minRead || 0, 12 * 1024);
  if (url instanceof File) {
    return new FileProtocol(url as File, min);
  }
  return new HttpProtocol(url as string, min);
}