#include <stdio.h>

void LOG(const char *format, ...)
{
  char szBuffer[1024] = { 0 };
  va_list ap;
	va_start(ap, format);
	vsnprintf(szBuffer,1024, format, ap);
	va_end(ap);
  printf("FFMPEG: %s \n",szBuffer);
}