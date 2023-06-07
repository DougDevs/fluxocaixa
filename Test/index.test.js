//npm init -y
//npm install jest axios
const axios = require('axios');
//const axios = require('axios');

test('GET -> Verifica se a rota de exibição de todos os treinos está funcionando corretamente', async () => {
    const response = await axios.get('http://localhost:5000/tasks');
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('tasks');
    
    const tasks = response.data.tasks;
    
    expect(tasks.length).toBeGreaterThan(0);
  });
    
//cria um treino abs
test('POST -> Cria um treino de abs', async () => {
  const treino = {
    title: 'Treino de abs',
    description: 'Treinar abs',
    periodo: 5
  };

  const response = await axios.post('http://localhost:5000/tasks/add/', treino);

  expect(response.status).toBe(201);
  expect(response.data).toHaveProperty('message', 'Tarefa Treino de abs criada com sucesso');

});

//verifica se tm um trieino com o nome treino de abs
test('GET -> Verifica se existe um treino com o título "Treino de abs"', async () => {
    const response = await axios.get('http://localhost:5000/tasks/');
    const tasks = response.data.tasks;
  
    // Verifica se existe pelo menos um treino com o título "Treino de abs"
    const hasTreinoAbs = tasks.some(task => task.title === 'Treino de abs');
  
    expect(hasTreinoAbs).toBe(true);
  });
  
//verificase existe um treino com periodo 5
test('GET -> Verifica se existe um treino com período igual a 5', async () => {
    const response = await axios.get('http://localhost:5000/tasks');
  
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('tasks');
  
    const tasks = response.data.tasks;
    const hasPeriod5 = tasks.some((task) => task.periodo === 5);
  
    expect(hasPeriod5).toBe(true);
});


test('Verifica se existe um treino com período maior que 4', async () => {
    // Faz uma solicitação GET para obter todos os treinos
    const response = await axios.get('http://localhost:5000/tasks');
  
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('tasks');
  
    const tasks = response.data.tasks;
  
    // Verifica se há pelo menos um treino com período maior que 7
    const hasPeriodGreaterThan7 = tasks.some((task) => parseInt(task.periodo) > 4);
  
    expect(hasPeriodGreaterThan7).toBe(true);
  });
  
test('Verifica se existe um treino com período menor que 6', async () => {
    const response = await axios.get('http://localhost:5000/tasks');
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('tasks');
    
    const tasks = response.data.tasks;
    const hasPeriodLessThan6 = tasks.some((task) => task.periodo < 6);
    
    expect(hasPeriodLessThan6).toBe(true);
  });
  
test('Verifica se a soma dos períodos de todos os treinos é maior que 3', async () => {
    const response = await axios.get('http://localhost:5000/tasks');
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('tasks');
    
    const tasks = response.data.tasks;
    
    let totalPeriod = 0;
    
    tasks.forEach((task) => {
      totalPeriod += task.periodo;
    });
    
    expect(totalPeriod).toBeGreaterThan(3);
  });
  
test('Verifica se existe pelo menos um treino com período igual a 3', async () => {
    const response = await axios.get('http://localhost:5000/tasks');
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('tasks');
    
    const tasks = response.data.tasks;
    
    const hasPeriod3 = tasks.some((task) => task.periodo === 3);
    
    expect(hasPeriod3).toBe(true);
  });

  
test('Verifica se todos os treinos têm nomes diferentes', async () => {
    const response = await axios.get('http://localhost:5000/tasks');
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('tasks');
    
    const tasks = response.data.tasks;
    
    const names = tasks.map((task) => task.title);
    const uniqueNames = [...new Set(names)];
    
    expect(names.length).toBe(uniqueNames.length);
  });

  test('Verifica se existe um treino com a descrição "matriz"', async () => {
    const response = await axios.get('http://localhost:5000/tasks');
  
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('tasks');
  
    const tasks = response.data.tasks;
    const hasDescriptionMatriz = tasks.some((task) => task.description === 'matriz');
  
    expect(hasDescriptionMatriz).toBe(true);
  });
  