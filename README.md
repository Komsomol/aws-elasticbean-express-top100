# Deployment on AWS Elastic Beanstalk step by step

This will talk through the installation and possible pitfalls when deploying node.js applications on AWS Elastic Beanstalk service. While the [documentation](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs.html) found on the AWS site is good it skips over some basics to get an application running. The application example is express app, that renders the current Billboard Top 100.

## Install AWS CLI and AWS EB CLI

The AWS CLI will let you configure your security credentials to allow access to your AWS account. The EB CLI is a far better tool for deployment on AWS Elastic Beanstalk itself, otherwise you are left uploading ```zip``` files with your source code. Since the installation of both these packages is covered well on AWS Docs it is best to simply follow those.

- [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- [Install AWS EB CLI](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html)

## EB CLI Commands
The follow are the commands you will need to deploy your node application to AWS Elastic Beanstalk. I assume that you have successfully configured your AWS CLI by running ```aws configure```. Note: AWS Elastic Beanstalk will always deploy your latest git commit.
- Create your application, run ```git init``` and ```git add .``` and ```git commit -m "hello aws eb"``` your files.
- By default AWS Elastic Beanstalk will try to execute your node application by trying app.js, then server.js, then "npm start" in that order. Here I defined ```"start": "node app"``` in ```package.json```
- AWS Elastic Beanstalk uses ```8081``` to connect so be sure to define your ports as ```const port = process.env.PORT || 8081;``` in your application.
- Run ```eb init``` to create your application. 
    - You will select the region for your app, define the app, create a name and pick that you are using node.js. It is ok to pick all defaults here. AWS Elastic Beanstalk will add a ```.elasticbeanstalk``` directory with a ```config.yml``` add it to your ```.gitignore```
- Run ```eb create``` to create an environment for your app. 
    - At this stage you will define the environment name, DNS CNAME and the load balancer type. It is ok to pick all defaults here. This step takes ~5 minutes.
- You are ready to deploy. Run ```eb deploy```
- Once complete check the status of your application via ```eb status```
- You can open your application by running ```eb open```
- If you need the console run ```eb console``` which will take you directly to Elastic Beanstalk console page. 
- If anything is wrong check the log via ```eb logs```

## Common Issues
- Some node.js packages might fail to install on AWS EB because of a permissions issue. Add a ```.npmrc``` file and add ```unsafe-perm=true``` this is especially common for any dependecy that needs to compile from source and runs ```node-gyp``` prcoess.
- If you are using a specific version of node.js it might be good to define the same version in the AWS EB Console under ```Modify software```