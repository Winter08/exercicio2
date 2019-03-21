const watsonAssistant = require('watson-developer-cloud/assistant/v1')

// Construindo uma instância do chatbot (IBM Watson)
const assistant = new watsonAssistant({
    version: '2019-03-11',
    username: 'apikey',
    password: '6pZEws7rNzMppIiUDaIPWYQS7q_impygfw0fhaY_tAJq',
    url: 'https://gateway.watsonplatform.net/assistant/api'
  })

module.exports = assistant