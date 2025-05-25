// دریافت ارجاع به المنت‌های ورودی و دکمه‌ها از صفحه
const taskInput = document.getElementById('task-input'); // ورودی متن تسک
const categorySelect = document.getElementById('category-select'); // انتخاب دسته‌بندی
const deadlineInput = document.getElementById('deadline-input'); // انتخاب تاریخ سررسید
const prioritySelect = document.getElementById('priority-select'); // انتخاب اولویت
const addTaskButton = document.getElementById('add-task'); // دکمه افزودن تسک
const deleteCompletedTasksButton = document.getElementById('delete-completed-tasks'); // دکمه حذف تسک‌های انجام‌شده
const taskList = document.getElementById('task-list'); // لیست نمایش تسک‌ها

// افزودن شنونده رویداد برای دکمه افزودن تسک
addTaskButton.addEventListener('click', addTask);
// افزودن شنونده رویداد برای دکمه حذف تسک‌های انجام‌شده
deleteCompletedTasksButton.addEventListener('click', deleteCompletedTasks);

// تابع افزودن تسک جدید به لیست
function addTask() {
    const taskText = taskInput.value.trim(); // گرفتن مقدار ورودی و حذف فاصله‌های اضافی
    const category = categorySelect.value; // گرفتن مقدار دسته‌بندی
    const deadline = deadlineInput.value; // گرفتن مقدار تاریخ سررسید
    const priority = prioritySelect.value; // گرفتن مقدار اولویت

    if (taskText === '') return; // اگر ورودی خالی بود، تابع خروج می‌کند

    // ساخت آبجکت تسک با اطلاعات وارد شده
    const task = {
        text: taskText,
        category,
        deadline,
        priority,
        completed: false // وضعیت انجام نشده
    };

    addTaskToList(task); // افزودن تسک به لیست نمایش
    clearInputFields(); // پاک کردن ورودی‌ها بعد از افزودن
}

// تابع پاک کردن ورودی‌های فرم
function clearInputFields() {
    taskInput.value = '';
    categorySelect.value = '';
    deadlineInput.value = '';
    prioritySelect.value = '';
}

// تابع افزودن تسک به DOM (لیست نمایش)
function addTaskToList(task) {
     const taskElement = document.createElement('li'); // ساخت عنصر لیست جدید برای تسک

     // ساخت چک‌باکس سفارشی برای علامت‌گذاری انجام شدن تسک
     const completionCheckbox = document.createElement('div');
     completionCheckbox.classList.add('custom-checkbox');

     if (task.completed) {
         completionCheckbox.classList.add('checked');
     }

     // افزودن رویداد کلیک برای تغییر وضعیت انجام‌شده تسک
     completionCheckbox.addEventListener('click', () => {
         task.completed = !task.completed; // تغییر وضعیت انجام‌شده
         completionCheckbox.classList.toggle('checked', task.completed); // تغییر ظاهر چک‌باکس
         taskElement.classList.toggle('completed', task.completed); // تغییر ظاهر تسک
     });
     taskElement.appendChild(completionCheckbox); // افزودن چک‌باکس به تسک

     // نمایش متن تسک
     const textElement = document.createElement('span');
     textElement.textContent = task.text;
     taskElement.appendChild(textElement);

     // نمایش دسته‌بندی تسک
     const categoryBadge = document.createElement('span');
     categoryBadge.textContent = task.category || 'No category'; // اگر دسته‌بندی انتخاب نشده بود
     categoryBadge.classList.add('category-badge');

     // نمایش تاریخ سررسید تسک
     const deadlineElement = document.createElement('span');
     deadlineElement.textContent = task.deadline || 'No deadline'; // اگر تاریخ انتخاب نشده بود
     deadlineElement.classList.add('deadline');

     // نمایش اولویت تسک
     const priorityLabel = document.createElement('span');
     priorityLabel.textContent = task.priority || 'No priority'; // اگر اولویت انتخاب نشده بود
     priorityLabel.classList.add('priority');

     // افزودن دسته‌بندی، تاریخ و اولویت به تسک
     taskElement.appendChild(categoryBadge);
     taskElement.appendChild(deadlineElement);
     taskElement.appendChild(priorityLabel);

     // دکمه ویرایش تسک
     const editButton = document.createElement('button');
     editButton.textContent = 'Edit';
     editButton.addEventListener('click', () => editTask(task, taskElement)); // رویداد ویرایش

     // دکمه حذف تسک
     const deleteButton = document.createElement('button');
     deleteButton.textContent = 'Del';
     deleteButton.addEventListener('click', () => deleteTask(task, taskElement)); // رویداد حذف

     // افزودن دکمه‌های ویرایش و حذف به تسک
     taskElement.appendChild(editButton);
     taskElement.appendChild(deleteButton);

     // افزودن تسک به ابتدای لیست نمایش
     taskList.prepend(taskElement);
}

// تابع ویرایش تسک (مقداردهی مجدد به ورودی‌ها و حذف تسک قبلی)
function editTask(task, taskElement) {
       taskInput.value = task.text; // قرار دادن متن تسک در ورودی
       categorySelect.value = task.category; // قرار دادن دسته‌بندی
       deadlineInput.value = task.deadline; // قرار دادن تاریخ
       prioritySelect.value = task.priority; // قرار دادن اولویت

       deleteTask(task, taskElement); // حذف تسک قبلی از لیست
}

// تابع حذف تسک از لیست نمایش
function deleteTask(task, taskElement) {
       taskList.removeChild(taskElement);
}

// تابع حذف همه تسک‌های انجام‌شده
function deleteCompletedTasks() {
   const completedTasks = Array.from(taskList.querySelectorAll('li.completed')); // انتخاب همه تسک‌های انجام‌شده

   completedTasks.forEach(task => {
       taskList.removeChild(task); // حذف هر تسک انجام‌شده
   });
}
