pipeline {
    agent any

    stages {
        stage("CI/CD start") {
            steps {
                script {
                    def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                    def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()

                    mattermostSend (
                        color: '#D0E0E3',
                        icon: "https://jenkins.io/images/logos/jenkins/jenkins.png",
                        message: "배포 출발 합니다 🛫 \n${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name}) <- 얘가 시작함 \n(<${env.BUILD_URL}|Details>)"
                    )
                }
            }
        }

        stage("CURRENT ID, GROUPS") {
            steps {
                script {
                    sh 'id'
                    sh 'groups'
                }
            }
        }

        stage("checkout_fe_consumer") {
            steps {
                script {
                    git credentialsId: 'gitlab', url: 'https://lab.ssafy.com/s10-final/S10P31D104.git', branch: "feConsumer"
                }
            }
        }

        stage("fe_consumer_env download") {
            steps {
                withCredentials([file(credentialsId: 'fe_consumer_env', variable: 'configFile')]) {
                    script {
                        sh 'cp -rf $configFile ./frontend-consumer/.env'
                    }
                }

                //withCredentials([file(credentialsId: 'firebase-messaging-sw', variable: 'configFile')]) {
                //    script {
                //        sh 'cp -rf $configFile ./frontend-consumer/public/firebase-messaging-sw.js'
                //    }
                //}
            }
        }
        
        stage('fe_consumer_build'){
            steps{
                script {
                    def feConsumerRunning = sh(script: 'docker ps -a --filter "name=fe-consumer" --format "{{.Names}}"', returnStdout: true).trim()
                    sh 'echo ${feConsumerRunning}'
                    if (feConsumerRunning) {
                        // fe container is running, stop and remove it
                        sh 'docker stop fe-consumer'
                        sh 'docker rm fe-consumer'
                        sh 'docker rmi fe-consumer'
                    }
                }
                
                sh 'docker build -t fe-consumer ./frontend-consumer'
                sh 'docker run -d --name fe-consumer -p 5173:5173 fe-consumer'   
            }
        }

        stage("checkout_fe_seller") {
            steps {
                script {
                    git credentialsId: 'gitlab', url: 'https://lab.ssafy.com/s10-final/S10P31D104.git', branch: "cicd"
                }
            }
        }

        stage("fe_seller_env download") {
            steps {
                withCredentials([file(credentialsId: 'fe_seller_env', variable: 'configFile')]) {
                    script {
                        sh 'cp -rf $configFile ./frontend-seller/.env'
                    }
                }

                //withCredentials([file(credentialsId: 'firebase-messaging-sw', variable: 'configFile')]) {
                //    script {
                //        sh 'cp -rf $configFile ./frontend-seller/public/firebase-messaging-sw.js'
                //    }
                //}
            }
        }
        
        stage('fe_seller_build'){
            steps{
                script {
                    def feSellerRunning = sh(script: 'docker ps -a --filter "name=fe-seller" --format "{{.Names}}"', returnStdout: true).trim()
                    sh 'echo ${feSellerRunning}'
                    if (feSellerRunning) {
                        // fe container is running, stop and remove it
                        sh 'docker stop fe-seller'
                        sh 'docker rm fe-seller'
                        sh 'docker rmi fe-seller'
                    }
                }
                
                sh 'docker build -t fe-seller ./frontend-seller'
                sh 'docker run -d --name fe-seller -p 5174:5174 fe-seller'   
            }
        }

        stage("checkout_be") {
            steps {
                script {
                    git credentialsId: 'gitlab', url: 'https://lab.ssafy.com/s10-final/S10P31D104.git', branch: "be"
                }
            }
        }

        stage("secret.yml, fcm-certification download") {
            steps {
                withCredentials([file(credentialsId: 'application-secret', variable: 'configFile')]) {
                    script {
                        sh 'cp -rf $configFile ./backend/src/main/resources/application-secret.yml'
                    }
                }

                withCredentials([file(credentialsId: 'fcm-certification', variable: 'configFile')]) {
                    script {
                        sh 'cp -rf $configFile ./backend/src/main/resources/fcm-certification.json'
                    }
                }
            }
        }

        stage('be_build'){
            steps{
                script {
                    def beRunning = sh(script: 'docker ps -a --filter "name=be" --format "{{.Names}}"', returnStdout: true).trim()
                    sh 'echo ${beRunning}'
                    if (beRunning) {
                        // be container is running, stop and remove it
                        sh 'docker stop be'
                        sh 'docker rm be'
                        sh 'docker rmi be'
                    }

                    sh 'docker build -t be ./backend'
                    sh 'docker run -d --name be -p 8081:8081 be'
                }
            }
        }
    }

    post {
        success {
            mattermostSend color: 'good', message: "Deploy Success! (${env.JOB_NAME}) #(${env.BUILD_NUMBER}) (<${env.BUILD_URL}|Open>) \n See the (<${env.BUILD_URL}console|console>)"
        }
        failure {
            mattermostSend color: 'danger', message: "Deploy Fail! ${Author_ID}(${Author_Name}) <- 얘가 범인임 (${env.JOB_NAME}) #(${env.BUILD_NUMBER}) (<${env.BUILD_URL}|Open>) \n See the (<${env.BUILD_URL}console|console>)"
        }
    }
}

