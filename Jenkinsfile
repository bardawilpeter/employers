node('master') {
    def app;
    def registryCredential='dockerhub';
    def registry="peterbardawil/employers-api"
    stage ('Checkout git'){
        checkout scm
    }
    stage('Build node packages') {
        sh 'npm install'
    }
    stage('Build image'){
       sh "docker build -t employers:app${BUILD_NUMBER} -f Dockerfile ."
    }
    stage('Integrations'){
        sh "docker-compose up -d"
    }
     stage('Push image') {
        docker.withRegistry( '', registryCredential ) { 
            sh "docker tag employers_app ${registry}:api-dev${BUILD_NUMBER}"
            sh "docker tag employers_app ${registry}:latest"
            sh "docker push ${registry}:api-dev${BUILD_NUMBER}"
            sh "docker push ${registry}:latest"
        }
    }
    stage('UnitTest') {
        sh 'npm test'
    }
    stage('Remove containers'){
        sh "docker-compose -f docker-compose.yml down -v"
    }
}
