(function() {
    'use strict';

    angular
        .module('myApp')
        .service('Config', Service);


    /* @ngInject */
    function Service() {
        var service = {
            'API_BASE_URL':'http://berwin.willandskill.eu:8081',
        };

        return service;
    }
})();