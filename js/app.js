$(document).ready(function () {
    // Planner: Task Management
    const taskForm = $("#task-form");
    const taskList = $("#task-list");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.empty();
        tasks.forEach((task, index) => {
            const li = $(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span>${task.title} ${task.time ? `(${task.time})` : ""}</span>
                    <button class="btn btn-danger btn-sm delete-task" data-index="${index}">Delete</button>
                </li>
            `);
            taskList.append(li);
        });
    }

    taskForm.on("submit", function (e) {
        e.preventDefault();
        const title = $("#task-title").val();
        const time = $("#task-time").val();
        if (!title) return;

        tasks.push({ title, time });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
        taskForm[0].reset();
    });

    taskList.on("click", ".delete-task", function () {
        const index = $(this).data("index");
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    });

    renderTasks();

    // Finance: Transaction Management
    const financeForm = $("#finance-form");
    const transactionList = $("#transaction-list");
    const balanceSpan = $("#balance");
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    function renderTransactions() {
        transactionList.empty();
        let balance = 0;
        transactions.forEach((txn, index) => {
            balance += txn.type === "income" ? txn.amount : -txn.amount;
            const li = $(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span>${txn.desc || txn.type} (${txn.type}): ${txn.amount}</span>
                    <button class="btn btn-danger btn-sm delete-txn" data-index="${index}">Delete</button>
                </li>
            `);
            transactionList.append(li);
        });
        balanceSpan.text(balance);
    }

    financeForm.on("submit", function (e) {
        e.preventDefault();
        const type = $("#transaction-type").val();
        const amount = parseFloat($("#transaction-amount").val());
        const desc = $("#transaction-desc").val();
        if (!amount) return;

        transactions.push({ type, amount, desc });
        localStorage.setItem("transactions", JSON.stringify(transactions));
        renderTransactions();
        financeForm[0].reset();
    });

    transactionList.on("click", ".delete-txn", function () {
        const index = $(this).data("index");
        transactions.splice(index, 1);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        renderTransactions();
    });

    renderTransactions();

    // Health: Activity Tracking
    const healthForm = $("#health-form");
    const activityList = $("#activity-list");
    let activities = JSON.parse(localStorage.getItem("activities")) || [];

    function renderActivities() {
        activityList.empty();
        activities.forEach((activity, index) => {
            const li = $(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span>${activity.type}: ${activity.value}</span>
                    <button class="btn btn-danger btn-sm delete-activity" data-index="${index}">Delete</button>
                </li>
            `);
            activityList.append(li);
        });
    }

    healthForm.on("submit", function (e) {
        e.preventDefault();
        const type = $("#activity-type").val();
        const value = parseFloat($("#activity-value").val());
        if (!value) return;

        activities.push({ type, value });
        localStorage.setItem("activities", JSON.stringify(activities));
        renderActivities();
        healthForm[0].reset();
    });

    activityList.on("click", ".delete-activity", function () {
        const index = $(this).data("index");
        activities.splice(index, 1);
        localStorage.setItem("activities", JSON.stringify(activities));
        renderActivities();
    });

    renderActivities();

    // Profile: User Settings
    const profileForm = $("#profile-form");
    let profile = JSON.parse(localStorage.getItem("profile")) || {};

    $("#user-name").val(profile.name || "");
    $("#user-goal").val(profile.goal || "");

    profileForm.on("submit", function (e) {
        e.preventDefault();
        profile.name = $("#user-name").val();
        profile.goal = $("#user-goal").val();
        localStorage.setItem("profile", JSON.stringify(profile));
        alert("Profile saved!");
    });
});