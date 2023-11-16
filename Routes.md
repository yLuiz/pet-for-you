**Usuário**

# - Need to be authenticated

  [POST]   - /users/register    (Faz o cadastro de um usuário)
  [POST]   - /users/login       (Faz o login/autenticação do usuário gerando um token)
# [GET]    - /users/checkuser   (Checagem do usuário)
# [GET]    - /users/:id         (Pega as informações de um usuário de acordo com seu id)
# [PATCH]  - /users/edit/:id    ()

**Pet**

# - Need to be authenticated

  [GET]    - /pets/:id          (Obtem detalhes do pet de acordo com seu id)
  [GET]    - /pets/             (Obtem todos os pets registrados no sistema)
# [POST]   - /pets/register     (Faz o cadastro de um pet de acordo com o usuário autenticado)
# [GET]    - /pets/mypets       (Obtem todos os pets do usuário autenticado)
# [GET]    - /pets/myadoptions  (Obtem todos os pets que foram adotados pelo usuário)
# [PATCH]  - /pets/:id          (Faz a atualização de um pet de acordo com seu id)
# [PATCH]  - /pets/schedule/:id (Faz um agendamento de um pet para o usuário que solicitou)
# [PATCH]  - /pets/conclude/:id (Conclui a adoção de um pet de acordo com o últmo que solicitou uma visita)
# [DELETE] - /pets/:id          (Faz a remoção de um pet de acordo com seu id)