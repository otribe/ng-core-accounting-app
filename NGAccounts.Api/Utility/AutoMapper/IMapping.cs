using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NGAccounts.Api
{
    public interface IMapping
    {
        MapperConfiguration GetMap<T1, T2>();
        IMapper GetMapper<T1, T2>(); 
        T2 GetSingleMapper<T1, T2>(T1 source);
        IEnumerable<T2> GetMultiMapper<T1, T2>(IEnumerable<T1> source);
    }
}
