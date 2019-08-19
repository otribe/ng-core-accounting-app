using System;
namespace NGAccounts.Api.ViewModels
{
    public class UserViewModel
    { 
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public string ProfilePicture { get; set; } 

        public string Email { get; set; }

        public string ContactNumber { get; set; }

        public string Address { get; set; }

        public bool? EmailConfirmed { get; set; }

        public string About { get; set; }

        public DateTime? LastLogoutTime { get; set; }

        public int? AddedBy { get; set; }

        public DateTime? DateAdded { get; set; }

        public int? ModifiedBy { get; set; }

        public DateTime? DateModied { get; set; }

        public string ChangePasswordCode { get; set; }

        public int RoleId { get; set; }

        public bool IsActive { get; set; }


    }
}

