using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentCourseCrud.Models;

namespace StudentCourseCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly StudentCourseCrudContext _context;

        public StudentsController(StudentCourseCrudContext context)
        {
            _context = context;
        }

        // GET: api/Students
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Student>>> GetStudent()
        //{
        //    return await _context.Students
        //       .Include(s => s.Studentcourses)
        //       .ToListAsync();
        //}
        /// <summary>

        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        //   .ThenInclude(s => s.Course)
        //   .Where(s => s.Id == s.Id)
        //   .Select(i => new
        //   {
        //       i.Id,
        //       i.Name,
        //       i.FatherName,
        //       i.Address,
        //       courses = _context.Courses.
        //       Select(s => s.CourseId)

        //   }).ToList();

        //return abc;

        // GET: api/Students/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await _context.Students
                .FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            return student;
        }

        // PUT: api/Students/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutStudent(int id, Student student)
        //{
        //    if (id != student.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(student).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!StudentExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //[HttpPut("{id}")]
        [HttpPut]
        public async Task<ActionResult<Student>> PutStudent(
    [FromBody] Student student,
    [FromQuery] int[] courseIds)
        {
            var existingStudent = await _context.Students.FindAsync(student.Id);

            if (existingStudent == null)
            {
                return NotFound();
            }

            existingStudent.Name = student.Name;
            existingStudent.FatherName = student.FatherName;
            existingStudent.Address = student.Address;
            // Add any other properties you want to update here

            _context.Students.Update(existingStudent);
            await _context.SaveChangesAsync();

            var existingStudentCourses = await _context.Studentcourses.Where(x => x.StudentId == student.Id).ToListAsync();

            foreach (var existingStudentCourse in existingStudentCourses)
            {
                _context.Studentcourses.Remove(existingStudentCourse);
            }

            foreach (var courseId in courseIds)
            {
                var studentCourse = new Studentcourse
                {
                    StudentId = student.Id,
                    CourseId = courseId
                };

                _context.Studentcourses.Add(studentCourse);
            }

            await _context.SaveChangesAsync();

            return Ok(student);
        }



        // POST: api/Students
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult <Student>> PostStudent(
            [FromBody]Student student,
            [FromQuery]int[] courseIds)
        {
            
            //var student = await _context.Students.FindAsync(student.id);
            _context.Students.Add(student);
            await _context.SaveChangesAsync();
           

            foreach(var courseId in courseIds)
            {
                var StudentCourse = new Studentcourse
                {
                    StudentId = student.Id,
                    CourseId = courseId

                };

                _context.Studentcourses.Add(StudentCourse);
            }
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudent", new { id = student.Id, courseIds }, student);



        }

        // DELETE: api/Students/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StudentExists(int id)
        {
            return _context.Students.Any(e => e.Id == id);
        }

        //[HttpGet("GetStudentCourses")]
        [HttpGet]
        public ActionResult<object> GetStudentwithCourses()
        {
            var std = _context.Students
               .Include(s => s.Studentcourses)
               .ThenInclude(b => b.Course)
               .Where(s => s.Id == s.Id)
               .Select(s => new
               {
                   s.Id,
                   s.Name,
                   s.FatherName,
                   s.Address,
                   Course = s.Studentcourses.
                   Select(b => b.Course.Name)

               })
               .ToList();
            if (std == null)
            {
                return NotFound();
            }
            else
            {
                return std;
            }
        }
        //uses for swagger
        //public async Task<Student?> GetStudentCourses(int id)
        //{
        //    return await _context.Students
        //        .Include(s => s.Studentcourses)
        //        .Where(s => s.Id == id)
        //        .FirstOrDefaultAsync();
        //}
        

    }
}
