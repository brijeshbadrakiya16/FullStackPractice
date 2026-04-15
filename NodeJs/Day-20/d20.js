// Day-20
// 2. Asynchronous context tracking
// 3. Async hooks
// 4. Buffer
// 5. C++ addons
// 6. C/C++ addons with Node API
// 7. C++ Embedder API
// 8. Child Process


// ___________________________________________________

// 2. Asynchronous context tracking

// __AsyncLocalStorage
// it provides a way to create a store that persists async calls
// major usecase is to attach id to logs as so we can trace back the logs to orinating id-request

// new AsyncLocalStorage([options]) -> to create a storage instance.
// .run(store,callback) -> runs the code inside a context
// .getStore() -> retrieves the current store and undefined if outside of the context.
// .enterWith(store) -> (less safe than run)
// .exit(callback) -> temporarily leaves the context
// .disable() -> disable the instance allowing it to be garbage collected
// .bind(fn) and .snapshot() -> Bind or capture the current context for later execution.

// __AsyncResource
// a lower level api to embedd custom context
// useful when working with worker threads or dbs where event-driven systems.

// new AsyncResource(type[,options]) -> cretes a custom async resource
// .runInAsyncScope(fn,thisArg,...args) -> runs the fn in the context
// .bind(fn) -> bind fn to context
// .emitDestroy() -> signals that the resource is destroyed
// .asyncId() / .triggerAsyncId() -> Retrive Ids for tracking resource lifetimes.

// Usecases -> Logging , Transaction/session tracking, worker pools, EventEmitters


// 3. Async hooks

// const async_hooks = require('async_hooks');
// const fs = require('fs');

// const hook = async_hooks.createHook({
//     init(asyncId, type, triggerAsyncId) {
//         fs.writeSync(1, `Init: ${type} (asyncId: ${asyncId}, trigger: ${triggerAsyncId})\n`);
//     },
//     before(asyncId) {
//         fs.writeSync(1, `Before: ${asyncId}\n`);
//     },
//     after(asyncId) {
//         fs.writeSync(1, `After: ${asyncId}\n`);
//     },
//     destroy(asyncId) {
//         fs.writeSync(1, `Destroy: ${asyncId}\n`);
//     }
// });

// hook.enable();

// setTimeout(() => {
//     console.log('Timer fired');
// }, 100);

// 4. Buffer

// const os = require('os');

// console.log(os.availableParallelism());

// __________________________________________________

// 8. Child Process

// spawn(command,args,options)
// -> runs a command directly and streams output via stdout/stderr.
// -> Long-running processes, streaming large data.

// exec(command,options,callback)
// -> runs a command in shell, buffers output and returns via callback
// -> Quick commands with small output.

// execFile(file,args,options,callback)
// -> runs an executable directly (no shell).
// -> more efficient, avoids shell injections risks.

// fork(modulePath, args, options)
// -> Special case of spawn for node.js scripts, with built-in IPC channel.
// -> Parent-child communication, scalling Node apps.

// const cp = require('child_process');
// const ls = cp.spawn('dir',['-lh','/usr'],{shell:true});

// ls.stdout.on('data',data=> console.log(`stdout ${data.toString()}`));
// ls.stderr.on('data',data=>console.error(`stderr: ${data}`));
// ls.on('error',err=>console.log("Failed to start process:", err))
// ls.on('close',code=>console.log(`Exitedd with code ${code}`));

// const child = cp.fork('../Day-19/d19.js');
// child.on('message', msg => console.log(`Parent got:`,msg));
// child.send({ hello: 'world' });
// child.send({ hello: 'world' });

// const { execFile } = require('child_process');
// const child = execFile('node', ["--version"], (err, stdout, stderr) => {
//     if (err) {
//         throw err;
//     }
//     console.log(stdout);
// })