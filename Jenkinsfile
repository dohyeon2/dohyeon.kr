pipeline {
    agent any
    stages {
        stage('Deploy') {
            steps {
                sh 'docker compose -f docker-compose.prod.yml up -d --build --force-recreate'
            }
        }
        stage('Clear') {
            steps {
                sh 'docker builder prune -f'
            }
        }
    }
}
