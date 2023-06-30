<img src="CodePinion\Static\Images\logo2.jpg" alt="drawing" width="100%"/> 

---

### **[CodePinion](https://codepinion.com/home)** is a platform :

- That allows you to **store and access your project’s source code** from any device with internet access.
- That allows you to **edit and run your code** without having to download it locally, provided that the project’s **requirements** are already installed.
- In the future, an **AI assistant** will be implemented to make the work of programmers even easier.

> **_NOTE:_**  **codepinion.com** is still in development and may take a few seconds to load. Please be patient.

---

### **Languages and Tools**

<p align="left"> 

<a href="https://www.djangoproject.com/" target="_blank" rel="noreferrer"> <img src="https://cdn.worldvectorlogo.com/logos/django.svg" alt="django" width="40" height="40"/> </a> <a href="https://www.python.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>  <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://www.figma.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="40" height="40"/> </a>   

</p>

---

### **Theme Colours**

- <span style="color:#406CEE">#406CEE</span> 
- <span style="color:#F3F3F3">#F3F3F3</span> 
- <span style="color:#ACACAC">#ACACAC</span> 
- <span style="color:#8F8F8F">#8F8F8F</span> 
- <span style="color:#C53B3B">#C53B3B</span> 
- <span style="color:#E44F26">#E44F26</span> 
- <span style="color:#F7DF1E">#F7DF1E</span> 

---


### **Codepinion and Django**

**Django Framework** - [Django](https://www.djangoproject.com/) is a high-level Python web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of web development, so you can focus on writing your app without needing to reinvent the wheel. It’s free and open source.

> **_NOTE:_**  **Codepinion** is built ontop of Django and other Python modules. Read [Requirements.txt](https://github.com/AlexNdungu/CodePinion-V1.2/blob/ssh/CodePinion/requirements.txt).

```
# Assuming python is installed

pip install django
```

---

### **CDPH (Codepinion Hierarchy V1.1)**

### **Databases Structure &rarr; (CodePinion and PostgreSQL)**

**PostgreSQL** - [PostgreSQL](https://www.postgresql.org/) is a powerful, open source object-relational database system with over 35 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.

```
# Assuming Django is already installed

pip install psycopg2
```

```
# Settings.py - Connecting django with database

DATABASES = {
   'default': {
       'ENGINE': 'django.db.backends.postgresql',
       'NAME': ‘<database_name>’,
       'USER': '<database_username>',
       'PASSWORD': '<password>',
       'HOST': '<database_hostname_or_ip>',
       'PORT': '<database_port>',
   }
}
```

**Django models** - Django models are the built-in feature that Django uses to create tables, their fields, and various constraints. In short, Django Models is the SQL of Database one uses with Django. Each model is a Python class that subclasses django.db.models.Model. Each attribute of the model represents a database field. 

&rarr; [Click To Read Django Models Documentation](https://docs.djangoproject.com/en/4.2/topics/db/models)

&rarr; [Click To Read The Models File](https://github.com/AlexNdungu/CodePinion-V1.2/blob/main/CodePinion/Code1/models.py)

```
# Write the models.py changes into PostgreSQL

python manage.py makemigrations
python manage.py migrate
```

<br/>

| Label                                       | Meaning      |
|---------------------------------------------|--------------|
| <span style="font-weight:bold" >1..1</span> | One-To_One   |
| <span style="font-weight:bold" >1..*</span> | One-To_Many  |
| <span style="font-weight:bold" >**</span>   | Many-To_Many |

<img src="CodePinion\Static\Images\DB_Design2.png" alt="drawing" width="50%"/> 

<img src="CodePinion\Static\Images\DB_Design.png" alt="drawing" width="100%"/> 

<br/>

### **Filing System &rarr; (CodePinion and Secure Shell)**

**Secure Shell (SSH)** - [SSH (Secure Shell)](https://www.digitalocean.com/community/tutorials/how-to-use-ssh-to-connect-to-a-remote-server) - protocol uses encryption to secure the connection between a client and a server. All user authentication, commands, output, and file transfers are encrypted to protect against attacks in the network.

