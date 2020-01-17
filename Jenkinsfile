pipeline {
    agent docker {
      image 'cypress/base:10'
    }
    stages {
        stage('build') {
            sh 'npm ci'
            sh 'npm run cy:verify'
        }
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