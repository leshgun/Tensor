define (
	'modules/personLib',
	['modules/person_factory', 'modules/school'], 
	// 'modules/person', 'modules/student', 'modules/teacher'],
	(Factory, School, Person, Student, Teacher) => {
		return {
			'Factory': Factory,
			'School': School,
			// 'Person': Person,
			// 'Student': Student,
			// 'Teacher': Teacher,
		};
	}
);
