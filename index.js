import express from "express"

//assegure que essa porta não esteja sendo usada por aplicação alguma no seu pc
const porta = 3000;
const host = "0.0.0.0"; //aqui diz que o host esta disponivel em todas as interfaces de rede no pc

// aqui é a aplicação servidora
const app = express();

//Para permitir que a minha aplicação possa usar os parâmetros que estão na url 
app.use(express.urlencoded({extended: true}));

app.get("/", (requisicao, resposta) => {
    
        const idade = parseInt(requisicao.query.idade);
        const sexo = requisicao.query.sexo;
        const salario_base = parseFloat(requisicao.query.salario_base);
        const anoContratacao = parseInt(requisicao.query.anoContratacao);
        const matricula = parseInt(requisicao.query.matricula);

        if (
            isNaN(idade) || idade <= 16 ||
            (sexo !== 'M' && sexo !== 'F') ||
            isNaN(salario_base) || salario_base <= 0 ||
            isNaN(anoContratacao) || anoContratacao <= 1960 ||
            isNaN(matricula) || matricula <= 0
        ) {
            resposta.send("Não foi possível realizar o cálculo, pois os dados não são válidos.");
            return;
        }
        
        let reajuste = salario_base * 0.1; 
        let novoSalario = salario_base + reajuste;
        
        resposta.send(`
        <html>
        <head>
            <title>Reajuste Salarial</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f2f2f2;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .container {
                    background-color: #fff;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    max-width: 400px;
                    width: 100%;
                    text-align: center;
                }
                h1 {
                    color: #333;
                    margin-bottom: 20px;
                }
                p {
                    margin: 10px 0;
                    font-size: 16px;
                }
                h2 {
                    color: green;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Reajuste Salarial</h1>
                <p><strong>Matrícula:</strong> ${matricula}</p>
                <p><strong>Idade:</strong> ${idade}</p>
                <p><strong>Sexo:</strong> ${sexo}</p>
                <p><strong>Salário Base:</strong> R$ ${salario_base.toFixed(2)}</p>
                <p><strong>Ano de Contratação:</strong> ${anoContratacao}</p>
                <h2>Novo Salário: R$ ${novoSalario.toFixed(2)}</h2>
            </div>
        </body>
        </html>
        `);
    });

    app.listen(porta, host, () => {
        console.log("Servidor escutando na porta 3000");
      });
    export default app;

