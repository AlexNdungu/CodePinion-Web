'''
UserGen Class 
'''

import random
import re

class UserGen():

    def __init__(self,email,max_num):
        
        self. email = email
        self.max_num = max_num


    def StripMail(self):

        '''
        This method Strips an Email.

        - It first check if the email format is valid, 
            * if true => it proceeds with the following
                Example:
                - Email = dev@gmail.com 
                    returns: dev
                - Email = testmail@yahoo.com
                    returns: testmail   

            * if false => raises a value error
        '''

        check_valid_mail = bool(re.match(r"[^@]+@[^@]+\.[^@]+", self.email))

        if check_valid_mail == True:

            mail_extract = self.email.split('@')[0]

            return mail_extract

        else:

            raise ValueError('Invalid Email Format : ' + self.email)
        

    def GenNumWithMax(self):

        '''
        ### This method 
        * Generates a random number considering the maximum number passed to it.
        * Then, converts the generated number to a string => str(generated_number).
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
        

    def GenMoreName(self, names_amount, custom_list = []):

        '''
        ### This method 
        * Generates the amount of names passed (names_amount = )
        * Also gives you the ability to compare the generated names with a (custom list = [ ])
        '''

        #Set of generated usernames
        generated_names_set = set()

        #Convert the custom list to find items faster Time Complexity of search in set is O(n)
        custom_list_set = set(custom_list)

        if isinstance(names_amount, int):
        
            if names_amount < 1:

                raise ValueError('The amount of names to be generated cannot be less than 1')
            
            else:

                if names_amount > self.max_num:

                    raise ValueError('The amount of names to be generated cannot be more than the set maximum range of the random numbers generated')
                
                else:

                    loop_count = 0

                    while loop_count < names_amount:

                        name_generated = self.Combine_Mail_Num()

                        if name_generated not in (generated_names_set | custom_list_set):

                            generated_names_set.add(name_generated)

                            loop_count += 1

                        else:

                            loop_count = loop_count


                #Covert the generated_names_set to a list to be returned
                generated_names = list(generated_names_set)


        else:

            raise ValueError('The amount of names to be generated should be of Integer type')


        return generated_names    