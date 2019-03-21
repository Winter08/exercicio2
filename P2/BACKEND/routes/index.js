const assistant = require('../configs/watson')

module.exports = router => {

  // Metodo POST
  router.post('/', (req, res) => {
    
    const { text, context = {}} = req.body

    const params = {
      input: {text},
      workspace_id: 'ec74b827-f9e2-4ef6-a141-3cd10850da96',
      context
    }

    assistant.message(params, (err, response) => {
      if (err)
        res.status(500).send(err)

      res.send(response)
      //res.send("TESTE")
    })

  })
  // FIM DO POST


};

