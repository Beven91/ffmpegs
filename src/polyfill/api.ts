/**
 * 以兼容方式创建一个AdioContext
 * @param contextOptions 
 * @returns 
 */
function createAudioContext(contextOptions?: AudioContextOptions) {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext
  const context = (new AudioContext(contextOptions)) as AudioContext;
  if (!context.createScriptProcessor) {
    context.createScriptProcessor = (context as any).createJavaScriptNode;
  }
  return context;
}

export default {
  createAudioContext
}