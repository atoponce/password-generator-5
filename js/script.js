var pg = angular.module('pg',[]);

pg.controller('MainCtrl', [ '$scope', function( $scope ){

    $scope.generatedPassword = '';
    
    var samples = [
            'abcdefghijklmnopqrstuvwxyz'.split(''),
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
            '+-*@#%=?!_;./'.split('')
        ],
        charCount = 14,
        pass = [], sample = '',
        choice, r, letter;

    var getRandomNumber = function( min, max ){
    
        return Math.floor( Math.random() * (max - min + 1) ) + min;
        
    };
    
    $scope.makePassword = function(){
        
        $scope.rotation = 0;
        
        for ( var i=0; i < charCount; i++ ){

            choice = getRandomNumber( 0, 2 );
            sample = samples[choice];
            r = getRandomNumber( 0, sample.length - 1 );
            letter = sample[r];
            
            console.log( letter, choice, r );
            
            pass.push( letter );
            
            $scope.rotation++;
            
        }
        
        $scope.generatedPassword = pass.join('');
        
    };
    
    $scope.makePassword();

}]);