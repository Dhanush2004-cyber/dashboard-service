pipeline {

    agent any

    parameters {

        choice(
            name: 'BRANCH',
            choices: [
                'main',
                'dev'
            ],
            description: 'Select the Git branch to deploy'
        )

    }

    stages {

        stage('Deploy Dashboard Service') {

            steps {

                script {

                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(

                                configName: 'Ubuntu',

                                verbose: true,

                                transfers: [

                                    sshTransfer(

                                        execCommand: """

                                            set -e

                                            echo "Selected Branch : ${params.BRANCH}"

                                            echo "===== DASHBOARD SERVICE DEPLOYMENT STARTED ====="

                                            cd /home/master/project/microservices/dashboard-service

                                            git fetch origin

                                            git checkout ${params.BRANCH}

                                            git reset --hard origin/${params.BRANCH}

                                            npm install

                                            if pm2 describe dashboard-service > /dev/null 2>&1
                                            then
                                                pm2 restart dashboard-service
                                            else
                                                pm2 start app.js --name dashboard-service
                                            fi

                                            pm2 save

                                            echo "===== DASHBOARD SERVICE DEPLOYED SUCCESSFULLY ====="

                                            """

                                    )

                                ]

                            )

                        ]

                    )

                }

            }

        }

    }

    post {

        success {

            echo "======================================"
            echo "Dashboard Service Deployment Successful"
            echo "======================================"

        }

        failure {

            echo "======================================"
            echo "Dashboard Service Deployment Failed"
            echo "======================================"

        }

        always {

            cleanWs()

        }

    }

}