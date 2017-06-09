angular.module('starter')
.controller('ListagemController', function($scope, CarroService){
	
	CarroService.obterCarros().then(function(dados){
		$scope.listaDeCarros = dados;
	});
});

angular.module('starter')
.controller('CarroEscolhidoController', function($stateParams, $scope){
	$scope.carroEscolhido = angular.fromJson($stateParams.carro);
	$scope.listaDeAcessorios = [{"nome" : "Freio Abs", "preco" :  800},
								{"nome" : "Ar Condicionado", "preco" :  1000},
								{"nome" : "MP3 Player", "preco" :  500}];
	$scope.mudou = function(acessorio, isMarcado){
		if(isMarcado){
			$scope.carroEscolhido.preco = $scope.carroEscolhido.preco + acessorio.preco;
		} else {
			$scope.carroEscolhido.preco = $scope.carroEscolhido.preco - acessorio.preco;
		}
	};
});


angular.module('starter')
.controller('FinalizarPedidoController', function($stateParams,$scope,$ionicPopup,$state, CarroService){
	$scope.carroFinalizado = angular.fromJson($stateParams.carroEscolhido);
	$scope.pedido = {};
	$scope.finalizarPedido = function(){
		var pedidoFinalizado = {
			params: {
				carro: $scope.carroFinalizado.name,
				preco: $scope.carroFinalizado.preco,
				nome: $scope.pedido.nome,
				endereco: $scope.pedido.endereco,
				email: $scope.pedido.email
			}
		}
		
		CarroService.salvarPedido(pedidoFinalizado).then(function(dados){
			$ionicPopup.alert({
				title: "Parabens",
				template: "Você acaba de Comprar um carro."
			}).then(function(){
				$state.go('listagem');
			});
		}, function(erro){
			$ionicPopup.alert({
				title:"Erro",
				template:"campos obrigatórios"
			});
		});
	}
	
});