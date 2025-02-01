const BASE_URL = 'https://localhost:7103/api'; 


export async function fetchTasks() {
    try {
      const response = await fetch(`${BASE_URL}/tasks`);
      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  }
  
  export async function createTask(task) {
    try {
      const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating task:', error);
      return null;
    }
  }

  export async function taskCompleted(id) {
    try{
        // eslint-disable-next-line no-debugger
        debugger;
        const response = await fetch(`${BASE_URL}/tasks/${id}/complete`, {
            method : "PUT",
        });
        
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return await response.json();
    }
    catch(error){
        console.error("Error completing task:", error);
        return null;

    }
  }