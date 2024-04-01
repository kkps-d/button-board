function Footer({ device }) {
  return (
    <div className="h-6 text-xs flex flex-col justify-center items-center text-default-500">
      button board alpha (main branch) &#8226; {device.name} ({device.id})
    </div>
  );
}

export default Footer;
