### Regras da aplicação

[ ] Deve ser possível cadastrar um pet
- Campos:
   - Nome do Pet -> Name : String
	 - Raça -> Breed : String
	 - Sobre -> About : String
	 - Idade (Filhote, Adulto, Idoso) -> Age : Enum('Puppy', 'Adult', 'Elderly')
	 - Porte (Pequeno, Médio, Grande) -> Size : Enum('Small', 'Medium', 'Large')
	 - Nível de Independência (Baixo, Médio, Alto) -> IndependenceLevel : Enum('Low', 'Medium', 'High')
	 - Nível de Energia (Baixo, Médio, Alto) -> EnergyLevel : Enum('Low', 'Medium', 'High')
	 - Ambiente (Apartamento, Casa com quintal, Ambiente Amplo) -> Environment : Enum('Apartment', 'House with yard', 'Large environment')
	 - Fotos -> Photos : Array(String)
	 - Requisitos para Adoção -> AdoptionRequirements : Array(String)
	 - ORG -> Org : String

[ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
[ ] Deve ser possível filtrar pets por suas características
[X] Deve ser possível visualizar detalhes de um pet para adoção
[ ] Deve ser possível se cadastrar como uma ORG
- Campos:
   - Nome -> Name : String
	 - Nome do Responsável -> ResponsibleName : String
	 - Email -> Email : String
	 - CEP -> ZipCode : String
	 - Endereço -> Address : String
	 - WhatsApp -> WhatsApp : String
	 - Senha -> Password : String

[] Deve ser possível realizar login como uma ORG

### Regras de negócio

[ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
[ ] Uma ORG precisa ter um endereço e um número de WhatsApp
[ ] Um pet deve estar ligado a uma ORG
[ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
[ ] Todos os filtros, além da cidade, são opcionais
[ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada
