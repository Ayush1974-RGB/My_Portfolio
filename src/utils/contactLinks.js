export function createEmailComposeUrl(email, subject = 'Portfolio contact') {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: email,
    su: subject,
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
}
