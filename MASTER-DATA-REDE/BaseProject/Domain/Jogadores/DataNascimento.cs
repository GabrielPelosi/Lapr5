using System;
using DDDSample1.Domain.Shared;
using System.Globalization;

namespace DDDSample1.Domain.Jogadores
{

    public class DataNascimento : IValueObject
    {
        public DateTime Value { get; private set; }

        public DataNascimento(DateTime data)
        {
            //isOlderThan16(data);
            this.Value = data;
        }

        public DataNascimento()
        {

        }

        /* verificar se a idade do jogador é maior ou igual a 16 */
        private void isOlderThan16(DateTime dateOfBirth)
        {
            if (DateTime.Today.Year - dateOfBirth.Year > 16)
            {
                this.Value = dateOfBirth; //return true
            }

            if (DateTime.Today.Year - dateOfBirth.Year == 16)
            {
                if (DateTime.Today.Month > dateOfBirth.Month)
                {
                    this.Value = dateOfBirth; //return true
                }
                if (DateTime.Today.Month == dateOfBirth.Month)
                {
                    if (DateTime.Today.Day >= dateOfBirth.Day)
                    {
                        this.Value = dateOfBirth; //return true
                    }
                }
            }
            if (DateTime.Today.Year - dateOfBirth.Year < 16)
            { //<16
                throw new BusinessRuleValidationException("ERROR! Data de nascimento inválida."); //return false
            }
        }

        public DateTime DataDeNascimento()
        {
            return Value;
        }

        public override string ToString()
        {
            return Value.ToString("d", DateTimeFormatInfo.InvariantInfo);
        }

    }

}

