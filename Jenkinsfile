pipeline {
    agent any

    // tools {nodejs "node"}

    // environment {
    //     CHROME_BIN = '/bin/google-chrome'
    // }
    
    stages {
        stage('deploy to angular'){
            // when {
            //     branch 'angular'
            // }
            steps {
                dir("folder") {
                    sh "pwd"
                    sh 'whoami'
                }
            }
      }
      
        // stage('Dependencies') {
        //     steps {
        //         sh 'npm i'
        //     }
        // }
        // stage('Build') {
        //     steps {
        //         sh 'npm run build'
        //     }
        // }
        // stage('Unit Tests') {
        //     steps {
        //         sh 'npm run test'
        //     }
        // }
        // stage('e2e Tests') {
        //     steps {
        //         sh 'npm run cypress:ci'
        //     }
        // }
        // stage('Deploy') {
        //     steps {
        //         echo 'Deploying....'
        //     }
        // }
    }
}