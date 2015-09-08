'use strict';

angular.module('sellerinterfaceApp')
    .factory('Author', function ($resource, DateUtils) {
        return $resource('api/authors/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.bod = DateUtils.convertLocaleDateFromServer(data.bod);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.bod = DateUtils.convertLocaleDateToServer(data.bod);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.bod = DateUtils.convertLocaleDateToServer(data.bod);
                    return angular.toJson(data);
                }
            }
        });
    });
