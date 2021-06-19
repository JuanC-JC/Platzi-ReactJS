import React from "react";

import "./styles/BadgeEdit.css";
import header from "../images/platziconf-logo.svg";
import Badge from "../components/Badge";
import BadgeForm from "../components/BadgeForm";
import api from "../api";
import md5 from "md5";
import PageLoading from "../components/PageLoading";

class BadgeEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: null,
      form: {
        firstName: "",
        lastName: "",
        email: "",
        jobTitle: "",
        twitter: "",
      },
    };

  }

  componentDidMount(){
    this.fetchData()
  }

  async fetchData(){
    this.setState({loading:true, error:null})

    try {
      const data = await api.badges.read(this.props.match.params.badgeId)
      this.setState({loading:false,form:data})
    } catch (error) {
      this.setState({loading:false,error:error})
    }
  }

  handleChange = (e) => {
    let dato = { ...this.state.form, [e.target.name]: e.target.value };

    if (e.target.name == "email") {
      dato = {...dato, avatarUrl: `https://www.gravatar.com/avatar/${md5(this.state.form.email)}?d=identicon`};
    }

    this.setState({
      form: {
        ...dato,
      },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    
    this.setState({ loading: true, error: null });

    try {
      await api.badges.update(this.props.match.params.badgeId,this.state.form);
      this.setState({ loading: false });

      this.props.history.push("/badges")

    } catch (error) {
      this.setState({ loading: false, error: error });
    }

  };

  render() {


    if (this.state.loading) {
      return <PageLoading />;
    }

    return (
      <React.Fragment>
        <div className="BadgeEdit__hero">
          <img
            className="BadgeEdit__hero-image img-fluid"
            src={header}
            alt="logo"
          />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-6">
              <Badge
                firstName={this.state.form.firstName || "FIRST_NAME"}
                lastName={this.state.form.lastName || "LAST_NAME"}
                jobTitle={this.state.form.jobTitle || "JOB_TITLE"}
                twitter={this.state.form.twitter || "TWITTER"}
                email={this.state.form.email || "EMAIL"}
              />
            </div>

            <div className="col-6">
              <BadgeForm
                onChange={this.handleChange}
                formValues={this.state.form}    
                onSubmit={this.handleSubmit}
                error={this.state.error}
                type = "Edit Attendant"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgeEdit;
