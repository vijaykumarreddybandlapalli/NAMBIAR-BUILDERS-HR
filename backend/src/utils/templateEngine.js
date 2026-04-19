export function fillTemplate(template = "", data = {}) {
    let output = template;
  
    Object.keys(data).forEach((key) => {
      const value = data[key] ?? "";
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      output = output.replace(regex, String(value));
    });
  
    return output;
  }
  
  export function getYearsOfService(joiningDate) {
    if (!joiningDate) return 0;
  
    const join = new Date(joiningDate);
    const today = new Date();
  
    let years = today.getFullYear() - join.getFullYear();
  
    const notCompletedYet =
      today.getMonth() < join.getMonth() ||
      (today.getMonth() === join.getMonth() && today.getDate() < join.getDate());
  
    if (notCompletedYet) years--;
  
    return years < 0 ? 0 : years;
  }