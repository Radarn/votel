(function() {
    'use strict';

    angular
        .module('myApp')
        .service('Config', Service);


    /* @ngInject */
    function Service() {
        var service = {
            'API_BASE_URL':'http://localhost:8080',
        };

        return service;
    }
})();