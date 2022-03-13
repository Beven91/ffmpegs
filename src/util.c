#include <stdio.h>

void LOG(const char *format, ...)
{
  char szBuffer[1024] = {0};
  va_list ap;
  va_start(ap, format);
  vsnprintf(szBuffer, 1024, format, ap);
  va_end(ap);
  printf("FFMPEG: %s \n", szBuffer);
}

void f32le_convert_to_fltp(float *f32le, float *fltp, int nb_samples)
{
  float *fltp_l = fltp;              // 左通道
  float *fltp_r = fltp + nb_samples; // 右通道
  for (int i = 0; i < nb_samples; i++)
  {
    fltp_l[i] = f32le[i * 2];     // 0 1   - 2 3
    fltp_r[i] = f32le[i * 2 + 1]; // 可以尝试注释左声道或者右声道听听声音
  }
}