//some Firebase code from https://dev.to/irohitgaur/how-to-use-firebase-realtime-database-in-a-node-js-app-nn
var firebase = require('firebase')
var firebaseConfig = {
    apiKey: "AIzaSyDemOqkNnQnyHUKkgqeuHV8GwQnoNBozII",
    authDomain: "slingshot-312422.firebaseapp.com",
    databaseURL: "https://slingshot-312422-default-rtdb.firebaseio.com",
    projectId: "slingshot-312422",
    storageBucket: "slingshot-312422.appspot.com",
    messagingSenderId: "171721560757",
    appId: "1:171721560757:web:5e480174098c952ac264fc",
    measurementId: "G-HRB8BLTC69"
};
firebase.initializeApp(firebaseConfig)
let database = firebase.database();

export async function add(options) {
    var path = "0";
    for (var i = 0; i < options.length; i++) {
        var obj = options[i]; //console.log(obj)

        //async function format from https://www.w3schools.com/js/js_async.asp
        let getNode = new Promise(function (resolve, reject) {
            //from official Firebase documentation, including https://firebase.google.com/docs/database/web/read-and-write and https://firebase.google.com/docs/reference/js/firebase.database.Reference
            database.ref('slingshot/' + path).once('value').then(function (snapshot) {
                snapshot.forEach((childSnapshot) => {
                    var childKey = childSnapshot.key.toString();
                    var childData = childSnapshot.val();
                    //console.log(childKey);
                    if (obj == childKey) {
                        resolve(childData);
                    }
                });
                resolve("false");
            })
        });
        const hasNode = await getNode;

        let numObj = new Promise(function (resolve, reject) {
            var numchildren = 0;
            database.ref('slingshot').once('value').then(function (snapshot) {
                snapshot.forEach((childSnapshot) => {
                    numchildren++;
                });
                resolve(numchildren);
            })
        })
        const getNumObj = await numObj;
        //console.log(getNumObj);


        if (hasNode == "false") {
            let putNode = new Promise(function (resolve, reject) {
                database.ref('slingshot/' + path).update({
                    [obj]: getNumObj,
                }, function (error) {
                    if (error) {
                        console.log("failed to add");
                    } else {
                    }
                });

                database.ref('slingshot/' + getNumObj).update({
                    isEnd: false,
                });
                resolve("true");
            });
            await putNode;

            path = getNumObj + "";
        }
        else {
            path = hasNode + "";
        }

        let lastNode = new Promise(function (resolve, reject) {
            if (i == options.length - 1) {
                database.ref('slingshot/' + path).update({
                    isEnd: true,
                });
                console.log("successfully added")
            }
            resolve("true");
        });
        await lastNode;
        //console.log(path);
    }
    return true;
}

export async function deleteval(options) {
    var searchNode = await search(options);

    if (searchNode == true) {
        var path = "0";
        for (var i = 0; i < options.length; i++) {
            var obj = options[i];
            let hasNode = new Promise(function (resolve, reject) {
                database.ref('slingshot/' + path).once('value').then(function (snapshot) {
                    snapshot.forEach((childSnapshot) => {
                        var childKey = childSnapshot.key.toString();
                        var childData = childSnapshot.val();
                        //console.log(childKey+" "+obj);
                        if (obj == childKey) {
                            path = childData;
                        }
                    });
                    resolve("true");
                });
            });
            await hasNode;
            if (i == options.length - 1) {
                //console.log(path);
                let lastNode = new Promise(function (resolve, reject) {
                    database.ref('slingshot/' + path).update({
                        isEnd: false,
                    }, function (error) {
                        if (error) {
                            console.log("failed to delete");
                        } else {
                            console.log("successfully deleted")
                        }
                    });
                    resolve("true");
                });
                await lastNode;
            }
        }
    }
    else {
        console.log("cannot delete keyword");
        return false;
    }
}

export async function search(options) {
    var path = "0";
    for (var i = 0; i < options.length; i++) {
        var obj = options[i];
        let hasNode = new Promise(function (resolve, reject) {
            database.ref('slingshot/' + path).once('value').then(function (snapshot) {
                snapshot.forEach((childSnapshot) => {
                    var childKey = childSnapshot.key.toString();
                    var childData = childSnapshot.val();
                    if (obj == childKey) {
                        path = childData;
                        resolve(childData);
                    }
                });
                resolve("false");
            });
        });
        const getHasNode = await hasNode;
        //console.log(getHasNode);
        if (getHasNode == "false") {
            console.log("does not have keyword [False]");
            return false;
        }

        if (i == options.length - 1) {
            let lastNode = new Promise(function (resolve, reject) {
                database.ref('slingshot/' + path).once('value').then(function (snapshot) {
                    snapshot.forEach((childSnapshot) => {
                        var childKey = childSnapshot.key.toString();
                        var childData = childSnapshot.val().toString();
                        if (childKey.localeCompare("isEnd") == 0 && childData.localeCompare("true") == 0) {
                            resolve("true");
                        }
                    });
                    resolve("false");
                });
            });
            const getLastNode = await lastNode;
            //console.log(getLastNode);
            if (getLastNode == "true") {
                console.log("has keyword [True]");
                return true;
            }
            else {
                console.log("does not have keyword [False] | has prefix [True]");
                return "lastnode";
            }
        }
    }

}


export async function suggest(options) {
    var searchNode = await search(options);

    if (searchNode == true || searchNode == "lastnode") {
        var path = "0";
        for (var i = 0; i < options.length; i++) {
            var obj = options[i];
            let hasNode = new Promise(function (resolve, reject) {
                database.ref('slingshot/' + path).once('value').then(function (snapshot) {
                    snapshot.forEach((childSnapshot) => {
                        var childKey = childSnapshot.key.toString();
                        var childData = childSnapshot.val();
                        //console.log(childKey+" "+obj);
                        if (obj == childKey) {
                            path = childData;
                        }
                    });
                    resolve("true");
                });
            });
            await hasNode;
        }
        var stack = []; var strings = [];
        stack.push(path); strings.push(options);
        while (stack.length > 0) {
            var cur = stack[strings.length - 1]; var curstring = strings[strings.length - 1];
            stack.pop(); strings.pop();
            //console.log(cur);

            let hasNode = new Promise(function (resolve, reject) {
                database.ref('slingshot/' + cur).once('value').then(function (snapshot) {
                    snapshot.forEach((childSnapshot) => {
                        var childKey = childSnapshot.key.toString();
                        var childData = childSnapshot.val().toString();
                        //console.log(childKey+" "+obj);
                        if (childKey.localeCompare("isEnd") == 0 && childData.localeCompare("true") == 0) {
                            console.log(curstring);
                        }
                        else {
                            stack.push(childData);
                            strings.push(curstring + childKey);
                        }
                    });
                    resolve("true");
                });
            });
            await hasNode;
            //console.log(stack);
            //console.log(strings);
        }
        return true;
    }
    else {
        console.log("cannot suggest keyword");
        return false;
    }
}

export async function display(options) {
    let numObj = new Promise(function (resolve, reject) {
        var numchildren = 0;
        database.ref('slingshot').once('value').then(function (snapshot) {
            snapshot.forEach((childSnapshot) => {
                //printing without newline from https://stackoverflow.com/questions/6157497/node-js-printing-to-console-without-a-trailing-newline
                process.stdout.write(childSnapshot.key + ": ");
                console.log(childSnapshot.val());
            });
            resolve(numchildren);
        })
    })
    const getNumObj = await numObj;
}