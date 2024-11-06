pipeline {
    agent any
    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    environment {
        DOCKER_IMAGE = "ansahmd123/backend-app"
        DOCKER_TAG = "latest"
        DOCKER_REGISTRY = "ansahmd123"
    }

    stages {
        stage('Prepare Environment') {
            steps {
                checout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    bat 'docker build -t $DOCKER_IMAGE:$DOCKER_TAG .'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub
                    bat 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                    
                    // Push the image to Docker Hub
                    bat 'docker push $DOCKER_IMAGE:$DOCKER_TAG'
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

    

    post {
        always {
            echo 'Pipeline complete.'
        }

        success {
            echo 'Pipeline succeeded.'
        }

        failure {
            echo 'Pipeline failed.'
        }
    }
}
