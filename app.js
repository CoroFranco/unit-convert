const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para analizar el cuerpo de las solicitudes POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta principal para servir el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para manejar el formulario enviado
app.post('/submit', (req, res) => {
  const type = req.body.conversionType;
  const fromUnit = req.body.fromUnit;
  const toUnit = req.body.toUnit;
  const value = req.body.value;
  
  const conversionFactors = {
    length: {
      Milímetro: 1000,
      Centímetro: 100,
      Metro: 1,
      Kilómetro: 0.001,
      Pulgada: 39.3701,
      Pie: 3.28084,
      Yarda: 1.09361,
      Milla: 0.000621371,
    },
    weigth: {
      Miligramo: 1000,
      Gramo: 1,
      Kilogramo:0.001 ,
      Onza: 0.035274,
      Libra: 0.00220462,
    },

    temperature: {
      Celsius:1,
      Fahrenheit:33.8 ,
      Kelvin: 274.15,
    }

  };


  function convertUnit(value, fromUnit, toUnit, type) {
    value = parseInt(value);
    if (type === 'temperature'){
      if (fromUnit === "Celsius" && toUnit === "Fahrenheit") {
      const result = (value * 9/5) + 32;
      return result;
      } else if (fromUnit === "Fahrenheit" && toUnit === "Celsius") {
      const result = (value - 32) * 5/9;
      return result;
      } else if (fromUnit === "Celsius" && toUnit === "Kelvin") {
      const result = value + 273.15;
      return result;
      } else if (fromUnit === "Kelvin" && toUnit === "Celsius") {
      const result = value - 273.15;
      return result;
      } else if (fromUnit === "Fahrenheit" && toUnit === "Kelvin") {
      const result = ((value - 32) * 5/9) + 273.15;
      return result;
      } else if (fromUnit === "Kelvin" && toUnit === "Fahrenheit") {
      const result = ((value - 273.15) * 9/5) + 32;
      return result;
      } else {
        return 'Unidad de temperatura no válida';
      }
    }else {
      const valueInStandar = value / conversionFactors[type][fromUnit];
      console.log(valueInStandar);
      const result = valueInStandar * conversionFactors[type][toUnit];
      return result;
    }
  }

  result = convertUnit(value, fromUnit, toUnit, type);

  res.send(`${value} ${fromUnit}s converted to ${toUnit}s is: <br> <span class="font-bold text-[2rem]">${result}</span> `);

});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
