const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

function save(){ 
  localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

function render(){
  list.innerHTML = '';
  tasks.forEach((t,i)=>{
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      <button class="check-btn">${t.done ? '✔️' : ''}</button>
      <span class="task-text ${t.done ? 'completed' : ''}">${t.text}</span>
      <div class="actions">
        <button class="edit-btn">Edit</button>
        <button class="del-btn">Delete</button>
      </div>`;
    list.appendChild(li);

    li.querySelector('.check-btn').onclick = ()=>{
      t.done = !t.done;
      save();
      render();
    }

    li.querySelector('.del-btn').onclick = ()=>{ 
      tasks.splice(i,1); 
      save(); 
      render(); 
    }

    li.querySelector('.edit-btn').onclick = ()=>{
      const span = li.querySelector('.task-text');
      const inp = document.createElement('input');
      inp.className = 'edit-input';
      inp.value = span.textContent;
      span.replaceWith(inp);
      inp.focus();

      inp.onblur = ()=>{ 
        tasks[i]= { text: inp.value || tasks[i].text, done: t.done }; 
        save(); 
        render(); 
      }

      inp.onkeydown = e=>{
        if(e.key==='Enter') inp.blur();
        if(e.key==='Escape') render();
      }
    }
  });
}

addBtn.onclick = ()=>{
  if(input.value.trim()){
    tasks.unshift({ text: input.value.trim(), done:false });
    save();
    input.value='';
    render();
  }
}

input.onkeydown = e=>{
  if(e.key==='Enter') addBtn.onclick();
}

render();