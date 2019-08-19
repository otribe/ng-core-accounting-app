using System;
using System.Collections.Generic; 
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
namespace NGAccounts.Models
{
    public class User : BaseEntity
    { 
       [Required]
       [DisplayName("User Name")]
       [StringLength(100)] 
       public string UserName { get; set; }

       [Required]
       [DisplayName("Password")]
       [StringLength(100)] 
       public string Password { get; set; }

       [Required]
       [DisplayName("First Name")]
       [StringLength(100)] 
       public string FirstName { get; set; }

       [DisplayName("Last Name")]
       [StringLength(100)] 
       public string LastName { get; set; }

       [DisplayName("Date Of Birth")]
       [Column(TypeName = "datetime")]
       public DateTime? DateOfBirth { get; set; }

       [DisplayName("Profile Picture")]
       [StringLength(100)] 
       public string ProfilePicture { get; set; }

       [Required]
       [DisplayName("Email")]
       [RegularExpression(@"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}", ErrorMessage = "Please enter correct email")]
       [StringLength(50)] 

       public string Email { get; set; }

       [DisplayName("Contact Number")]
       [StringLength(15)] 
       public string ContactNumber { get; set; }

       [DisplayName("Address")]
       [StringLength(500)] 
       public string Address { get; set; }

       [DisplayName("Email Confirmed")]
       public bool? EmailConfirmed { get; set; }

       [DisplayName("About")]
       [StringLength(500)] 
       public string About { get; set; }

       [DisplayName("Last Logout Time")]
       [Column(TypeName = "datetime")]
       public DateTime? LastLogoutTime { get; set; }

       [DisplayName("Added By")]
       public int? AddedBy { get; set; }

       [DisplayName("Date Added")]
       [Column(TypeName = "datetime")]
       public DateTime? DateAdded { get; set; }

       [DisplayName("Modified By")]
       public int? ModifiedBy { get; set; }

       [DisplayName("Date Modied")]
       [Column(TypeName = "datetime")]
       public DateTime? DateModied { get; set; }

       [DisplayName("Change Password Code")]
       [StringLength(50)] 
       public string ChangePasswordCode { get; set; }

       [Required]
       [DisplayName("Role")]
       public int RoleId { get; set; }

       public virtual Role Role_RoleId { get; set; }

       [Required]
       [DisplayName("Is Active")]
       public bool IsActive { get; set; }

       public virtual ICollection<RoleUser> RoleUser_UserIds { get; set; }

       public virtual ICollection<MenuPermission> MenuPermission_UserIds { get; set; }


    }
}

