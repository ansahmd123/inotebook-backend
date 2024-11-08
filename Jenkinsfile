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
                    bat 'docker build -t %DOCKER_IMAGE%:%DOCKER_TAG% .'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Use withCredentials to securely access Docker Hub credentials
                    withCredentials([usernamePassword(credentialsId: 'docker-credentials', variable: 'DOCKER_USERNAME', variable: 'DOCKER_PASSWORD')]) {
                        bat "echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin"
                        bat "docker push %DOCKER_IMAGE%:%DOCKER_TAG%"
                    }
                }
            }
        }

        stage('Run Docker Compose') {
            steps {
                script {
                    // Run the Docker Compose command to start the containers
                    bat 'docker-compose up -d --build'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Optionally, you can add commands to test your application here
                    echo 'Running tests...'
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    // Optionally, clean up containers or resources after the build
                    echo 'Cleaning up...'
                    bat 'docker-compose down'
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
