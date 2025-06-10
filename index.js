import { map, Observable } from "rxjs";

const users = {
    data:[
        {
            status: "inactive",
            age: 14
        },
        {
            status: "inactive",
            age: 14
        },
        {
            status: "active",
            age: 14
        },
        {
            status: "active",
            age: 14
        },
        {
            status: "active",
            age: 14
        },
        {
            status: "active",
            age: 14
        },
        {
            status: "active",
            age: 14
        },
        {
            status: "inactive",
            age: 14
        },
        {
            status: "active",
            age: 14
        },
        {
            status: "active",
            age: 14
        },
        {
            status: "active",
            age: 14
        }
    ]
}


// Observable will emit a value and sent it to observer via subscribe method

const observable = new Observable((subscriber)=>{
    subscriber.next(users);
}).pipe(
    map((value)=>{
        console.log("1) Value received from observable: ", value);
        return value.data
    }),
    map((data)=>{
        console.log("2) Data received from operator: ", data);
        return data.filter((user) => user.status === "active" && user.age > 10);
    }),
    map((filteredData)=>{
        console.log("3) Filtered data received from operator: ", filteredData);
        return filteredData.reduce((sum, user)=>sum+user.age, 0)/filteredData.length;
    }),
    map((value)=>{
        console.log("4) Average age received from operator: ", parseInt(value));
        if (value < 20) {
            throw new Error("Average age is less than 20");
        }
        return value;
    })
);


// The observer will receive the value and log it to the console
const observer = {
    next: (value)=>{
        console.log("Value received", parseInt(value));
    },

    error: (value)=>{
        console.error("Error received");
    },

    complete: ()=>{
        console.log("Completed");
    }
};


observable.subscribe(observer);