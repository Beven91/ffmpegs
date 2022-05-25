import { FFMpegProtocol } from "../interface";
import HttpProtocol from "./http";

export default function loadAvcodecInput(url: string | File, minRead: number): FFMpegProtocol {
  return new HttpProtocol(minRead, url as string);
}