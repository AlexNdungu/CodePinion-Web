'''
UserGen Class - Generates usernames
'''

import random
import re

class UserGen():

    def __init__(self,email,max_num):
        
        self. email = email
        self.max_num = max_num


    def StripMail(self):

        '''
        This method Strips an email

        - It first check if the email format is valid, 
            * if true => it proceeds with the following
                Example:
                1. Email = dev@gmail.com 
                    returns: dev
                2. Email = testmail@yahoo.com
                    returns: testmail   

            * if false 
        '''

        check_valid_mail = bool(re.match(r"[^@]+@[^@]+\.[^@]+", self.email))

        if check_valid_mail == True:

            mail_extract = self.email.split('@')[0]

            return mail_extract

        else:

            raise ValueError('Invalid Email Format : ' + self.email)
        

    def GenNumWithMax(self):

        '''
        This method generates a random number considering the maximum number passed to it
        '''

        if isinstance(self.max_num, int):

            if self.max_num < 1:

                raise ValueError('The Maximum Number should be greated than 1')
            
            else:

                gen_number =  random.randint(1, self.max_num)

                gen_number = str(gen_number)

                return gen_number
        
        else:

            raise ValueError('The Maximum Number should be of type Integer')
        

    def Combine_Mail_Num(self):

        '''
        This method now combines the stripped email and random number generated
        '''

        return self.StripMail() + self.GenNumWithMax()
    

    def GenMoreName(self, names_number):

        '''
        This method generates the number of names passed (names_number)
        '''

        #List of generated usernames
        generated_names = []

        if isinstance(names_number, int):
        
            if names_number < 1:

                raise ValueError('The amount of names to be generated cannot be less than 1')
            
            else:

                loop_count = 0

                while loop_count < names_number:

                    name_generated = self.Combine_Mail_Num()

                    if name_generated not in generated_names:

                        generated_names.append(name_generated)

                        loop_count += 1

                    else:

                        loop_count = loop_count


        else:

            raise ValueError('The amount of names to be generated should be of Integer type')


        return generated_names    