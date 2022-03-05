#include <stdio.h>
#include <emscripten.h>

int main(){
  EM_ASM({
    var a = 10;
    var data = {
      name:'zzz'
    };
    console.log(data);
    sayHello();
  });
}