import { GetMapping, HttpServletResponse, PostMapping, RequestMapping, RestController, ServletResponse } from "node-web-mvc";

@RestController
@RequestMapping('/home')
export default class HomeController {

  @GetMapping('/hello')
  sayHello(){
    return 'hello222';
  }

  @GetMapping('/time')
  queryServerTime(@ServletResponse response: HttpServletResponse) {
    return new Promise(() => {
      response.setHeader('Content-Type','text/event-stream');
      response.setHeader('Connection','keep-alive');
      response.setHeader("Transfer-Encoding","identity");
      let id = 0;
      setInterval(() => {
        console.log('hello');
        response.write(`event: time\nid: ${++id}\nretry: 2000\ndata: ${Date.now()}\n\n`);
      }, 1000)
    });
  }
}
