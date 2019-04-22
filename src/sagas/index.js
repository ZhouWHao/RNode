
//这里的function*不是一个函数而是一个generator(生成器)
//function*内部的代码通过yield语句来执行暂停操作
//如果调用生成器函数时没有给它赋一个变量，它会永远生成一个新的
//生成器，而每一个使用了yield语句的代码行都需要
//通过生成器调用next()方法来执行下一个语句
//generator.next()会返回一个对象，这个对象包含两个属性
//done: false(false表示还没有执行完毕，true表示内部代码执行完毕)
//value: undefined(value属性对应的是我们的yield后面的语句的返回值，执行完之后会用undefined表示)
//如果我们在生成器内部最后一个语句使用了return ，那么value的属性值将会是return 语句后面的返回值。
//当我们的非yield语句在和yield语句一起使用的时候，如果在yield语句后面的非yield语句将会在下一个next()语句执行时才会执行
//如果使用var name = yield '3565565'; console.log(name);得到的返回值是undefined
//如果在generator.next('ruby')中传值，那么传入的值将被当作上一个yield语句的返回值
//当使用yield语句配合异步代码的时候，就可以像用同步的方式写异步的代码，写法更加优雅，避免ajax(ajax(ajax))类似的回调地狱问题
//一个简单的自动执行生成器代码例子
// function *gen(){
//     var posts = yield $.getJSON("https://jsonplaceholder.typicode.com/posts")
//     console.log(posts[0].title);
//     var users = yield $.getJSON("https://jsonplaceholder.typicode.com/users")
//     console.log(users[0]);
//   }
//   run(gen);
//   function run(generator){
//     var myGen = generator();
//     function handle(yielded){
//       if(!yielded.done){
//         yielded.value.then(function(data){
//           return handle(myGen.next(data));
//         })
//       }
//     }
//     return handle(myGen.next());
//   }
import {all,fork} from 'redux-saga/effects';
// import {watchFetchUser,watchFetchTodos} from './user';
import * as userSagas from './user';
import * as counterSagas from './counter';
// console.log(Object.values(userSagas));
//用这个根级别saga来组合多个saga
export default function* rootSaga(){
   //通过yield[,]语句结合all方法并发执行这两个generator函数
   // yield all([
   //    watchAddDataAsync(),
   //    watchFetchUser(),
   //    watchFetchTodos()
   // ]);
   //使用扩展运算符展开
   yield all([
     ...Object.values(userSagas),
     ...Object.values(counterSagas)
   ].map(fork));
   //等同于
   // yield all([
   //    fork(watchAddDataAsync()),
   //    fork(watchFetchUser()),
   //    fork(watchFetchTodos())
   // ]);
   //all提供了一种并行执行异步请求的方式
   //可以将多个异步操作作为参数参入all函数中，
   //如果有一个call操作失败或者所有call操作都成功返回，则本次all操作执行完毕
   //fork相对于generator函数来说，call操作是阻塞的，
   //只有等promise回来后才能继续执行，而fork是非阻塞的 ，当调用fork启动一个任务时，该任务在后台继续执行，
   //从而使得我们的执行流能继续往下执行而不必一定要等待返回。

   //简单的可以理解为上面的代码是并行执行无阻塞的异步请求方式。
}
