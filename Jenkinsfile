pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    environment {
        DOCKER_IMAGE = "ansahmd123/backend-app"
        DOCKER_TAG = "latest"
    }

    stages {
        stage('Prepare Environment') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Use withCredentials to securely access Docker Hub credentials
                    withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh '''
                            echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                            docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                        '''
                    }
                }
            }
        }

        stage('Run Docker Compose') {
            steps {
                script {
                    // Run the Docker Compose command to start the containers
                    sh 'docker-compose up -d --build'
                }
            }
        }

        stage('Stop Services') {
            steps {
                script {
                    sh 'docker-compose down'
                }
            }
        }
        
        stage('Post-Build Actions') {
            steps {
                // Clean up workspace after pipeline execution
                cleanWs()
            }
        }
    }
}
