---
title: "apache2 in the cloud: a complete how-to from start to finish using amazon’s ec2"
author: "Seth Mason"
pubDatetime: 2010-11-05T10:56:00
description: "TASK : setup a linux web server running apache2 using Amazon’s recently released free tier of their popular cloud computing service, ec2 , which resides…"
timezone: "America/Toronto"
tags:
  - "amazon"
  - "aws"
  - "ec2"
  - "cloud"
  - "computing"
  - "apache"
  - "apache2"
  - "linux"
  - "tech"
---

**TASK**: setup a linux web server running apache2 using Amazon’s recently released [free tier](http://aws.amazon.com/free/) of their popular cloud computing service, [ec2](http://aws.amazon.com/ec2/), which resides on the amazon web services ([aws](http://aws.amazon.com/what-is-aws/)) platform:

***LEGAL**: this how-to article is to be used as a reference point for your educational needs only. I cannot be held responsible for any misuse and/or monetary charges that you may incur as a result. I strongly urge you to carefully read through the amazon customer service agreement located [here](http://aws.amazon.com/free/terms/) as well as [here](http://aws.amazon.com/agreement/).*

**MATERIALS REQUIRED:**

* an amazon.com account. you can create one here: <https://aws-portal.amazon.com/gp/aws/developer/registration/index.html>
* a valid credit card to validate your aws account. your cc will not be charged if you stay within the free tier limits. please educate your self by reading and understanding the terms set by amazon for their free tier offer: <http://aws.amazon.com/free/terms>
* working knowledge of the command line within a linux environment
* a couple of hours of free time

**PART 1 - AMAZON AWS EC2**

1. login to the aws console: [https://console.aws.amazon.com/ec2/home](https://console.aws.amazon.com/ec2/home%E2%80%A8) [ⓘ](http://imgur.com/KtpiN.png)
2. you will be brought to the ec2 dashboard [ⓘ](http://imgur.com/UAswA.png)
3. click on the ‘Launch Instance’ button [ⓘ](http://imgur.com/FxJUQ.png)
4. we will choose the ‘Basic 32-bit Amazon Linux AMI 1.0’ base (complying with the free tier terms) [ⓘ](http://imgur.com/LYWO1.png)
5. change the ‘Instance Type’ from ‘Small’ to ‘Micro’ and then click ‘Continue’ [ⓘ](http://imgur.com/BkaGv.png)
6. leave the ‘Advanced Instance Options’ as default and click ‘Continue’. confirm that ‘Monitoring’ is UNCHECKED as using this service will incur charges to your aws account [ⓘ](http://imgur.com/RNRCo.png)
7. tag your Instance for ease of administration. click ‘Continue’ to proceed [ⓘ](http://imgur.com/jRCA2.png)
8. enter a name for your key pair. choose an identifiable name as you will be downloading the key pair file and will require it to connect to your ec2 instance. click on ‘Create & Download your Key Pair’ to continue. save the \*.pem file to a secure location [ⓘ](http://imgur.com/9Onfi.png)
9. next we configure the firewall. choose a name for your security group and add a description to identify its purpose [ⓘ](http://imgur.com/Pv9rp.png)
10. we will choose HTTP from the list and click on the ‘Add Rule’ button. you will notice that SSH is already enable by default and we we will leave that as is. click on ‘Continue’ to proceed [ⓘ](http://imgur.com/RhpzQ.png)
11. before we click ‘Launch’ please review the details and edit as necessary [ⓘ](http://imgur.com/aNrvf.png)
12. you will be brought back to the ec2 dashboard. click on ‘Instances’ to see your newly created instance and make note of the 'Public DNS’ name as we will need this info later on [ⓘ](http://imgur.com/aCFUW.png)
13. next we need to connect to our instance by clicking on 'Connect’ under 'Instance Management’ and 'Instance Actions’ [ⓘ](http://imgur.com/Z4RRh.png)
14. a pop-up will appear providing some instructions and information on how to SSH into your newly created ec2 server. we will follow these steps in part 2 of this tutorial below [ⓘ](http://imgur.com/6Q1x2.png)

**PART 2: SHH AND APACHE**

1. launch terminal on your mac or putty on your windows based pc (we will use terminal for the purpose of this article)
2. navigate to where we saved the \*.pem file in step #8 of part 1
3. we need to secure the \*.pem file by applying some permissions to it (replace your-key-pair-file with the name of your \*.pem file):  *chmod 400 your-key-pair-file.pem*
4. enter the following to code to log into your ec2 server (replace your-key-pair-file with the name of your \*.pem file and ec2-xxx.xxx.xxx.xxxx.compute-1.amazonaws.com with the dns name of your ec2 server. this information can be located within the ec2 dashboard by clicking on your ec2 - see step #12 of part 1). please note that although the amazon pop-up suggests logging on via the 'root’ user, this is not possible as 'root’ login via ssh is disabled by default. Rather use 'ec2-user’ instead as shown in the example:  
     
   *ssh -i your-key-pair-file.pem ec2-user@ec2-xxx.xxx.xxx.xxxx.compute-1.amazonaws.com*
5. you will now be logged into the ec2 server instance
6. we need to enable and create a password for the root account:  
     
   *sudo passwd root*
7. for some odd reason the amazon linux ami is missing the gcc library that is required to compile our apache2 source. lets download and install gcc (we need to do this as root. click yes to install all the dependencies):  
     
   *sudo yum install gcc*
8. create a temporary directory to download apache:  
     
   *mkdir apache2*
9. navigate to the newly created 'apache2’ directory:  
     
   *cd apache2*
10. next we will download the latest version and build of apache (you can choose any mirror you’d like):  
      
    *wget <http://mirror.csclub.uwaterloo.ca/apache//httpd/httpd-2.2.17.tar.gz>*
11. we will now extract the downloaded apache2 source file:  
      
    *tar xvfz httpd-2.2.17.tar.gz*
12. navigate to the extracted directory:  
      
    *cd httpd-2.2.17*
13. now we configure apache2 (we need to do this as root. this process will take a few minutes):  
      
    *sudo /.configure*
14. next we compile apache2 (this process will take a few minutes):  
      
    *make*
15. and lastly we install apache2 (we need to do this as root):  
      
    *sudo make install*
16. we finally have apache2 downloaded, configured, compiled and installed but need to start the service (we need to do this as root):  
      
    *sudo /usr/local/apache2/bin/apachectl start*
17. fire up your web browser and populate the address bar with your ec2’s public dns name and hit go. booya! If all went well you should see a page that says 'It works!

**NOTES:**

* you can further configure the apache2 server and also customize the default page. I recommend reading up on the wealth of documentation available at: <http://httpd.apache.org/docs/2.2/>
* if you own a domain, you can customize your ec2’s public dns name with a [CNAME](http://en.wikipedia.org/wiki/CNAME_record) record
* why you ask? I am not sure why? boredom? because I can? its there? free?
* what next you ask? [BIND](http://www.isc.org/software/bind) or [sendmail](http://www.sendmail.com/sm/open_source/) or [postfix](http://www.postfix.org/)
* please leave your questions and feedback in the comments below

**SOURCES:**

* <http://www.google.com/linux/>
* <http://aws.amazon.com/documentation/ec2/>
* <http://httpd.apache.org/docs/2.2/>
* <http://www.redhat.com/docs/en-US/Red_Hat_Enterprise_Linux/5.5/html/Deployment_Guide/s1-yum-useful-commands.html>
* <http://gcc.gnu.org/install/>
